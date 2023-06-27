import React, { useEffect, useState } from "react";
import "../assets/styles/workspace.css";
import axios from "axios";
import * as Tooltip from "@radix-ui/react-tooltip";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { getNewsData, editNewsData } from "../services/firebase";
import ModalSelect from "./modal-select";

function News() {
  const [newsData, setNewsData] = useState([]);
  const [news, setNews] = useState([]);
  const [category, setCategory] = useState("");
  const [language, setLanguage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const getNews = async () => {
    const userId = localStorage.getItem("uid");
    const workspaceId = localStorage.getItem("WorkspaceId");
    const newsData = await getNewsData(userId, workspaceId);
    console.log("News Data: ", newsData);
    setNewsData(newsData);
    setCategory(newsData[0].newsCategory);
    setLanguage(newsData[0].newsLanguage);
  };

  useEffect(() => {
    getNews();
  }, []);

  useEffect(() => {
    if (category && language) {
      axios
        .get(
          "https://newsapi.org/v2/top-headlines?category=" +
            category +
            "&language=" +
            language +
            "&apiKey=a526ee014bca4b5e9335e06e4d86d1bd"
        )
        .then((res) => {
          setNews(res.data.articles.slice(0, 5));
          console.log("News:", res.data.articles.slice(0, 5));
        });
    }
  }, [category, language]);


  const updateNews = (language, category) => {
    setSelectedLanguage(language);
    setSelectedCategory(category);
    setLanguage(language);
    setCategory(category);
    setShowModal(false);
  
    const userId = localStorage.getItem("uid");
    const workspaceId = localStorage.getItem("WorkspaceId");
  
    editNewsData(userId, workspaceId, language, category)
      .then(() => {
        console.log("Dados atualizados na Firebase", language, category);
        getNews();
        console.log("Dados atualizados na Firebase");
      })
      .catch((error) => {
        console.log("Erro ao atualizar dados na Firebase:", error);
      });
  };

  const handleEditNews = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="rectangle task-rectangle">
      <div className="rectangle-title d-flex align-items-center">
        <h3>News</h3>
        <button onClick={handleEditNews} className="edit-icon">
          <Pencil1Icon style={{ width: "25px", height: "25px" }} />
        </button>
      </div>
      <div className="news">
        {news.map((newsItem) => (
          <Tooltip.Provider key={newsItem.url}>
            <Tooltip.Root>
              <div className="news-item d-flex align-items-center my-2">
                <img
                  src={`https://www.google.com/s2/favicons?domain=${
                    newsItem.url
                  }&sz=${256}`}
                  style={{ width: "25px", height: "25px", marginRight: "10px" }}
                  alt=""
                />
                <Tooltip.Trigger asChild>
                  <a
                    href={newsItem.url}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    {newsItem.title}
                  </a>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content
                    style={{ width: "450px", color: "black" }}
                    className="TooltipContent"
                    side="bottom"
                  >
                    <h5>{newsItem.title}</h5>
                    <img
                      src={newsItem.urlToImage}
                      style={{ width: "100%" }}
                      alt=""
                    />
                    <hr />
                    <p style={{ lineHeight: "20px" }}>{newsItem.description}</p>
                    <a href={newsItem.url}>Ler mais...</a>
                    <div className="d-flex align-items-center">
                      <img
                        src={`https://www.google.com/s2/favicons?domain=${
                          newsItem.url
                        }&sz=${256}`}
                        style={{
                          width: "25px",
                          height: "25px",
                          marginRight: "10px",
                        }}
                        alt=""
                      />
                      <p style={{ margin: "0" }}>{newsItem.source.name}</p>
                    </div>
                  </Tooltip.Content>
                </Tooltip.Portal>
              </div>
            </Tooltip.Root>
          </Tooltip.Provider>
        ))}
      </div>
      {showModal && (
        <ModalSelect
        title="Edit news preferences"
        description="Select news category and language"
        confirmText={"Save"}
          selectedLanguage={selectedLanguage}
          selectedCategory={selectedCategory}
          onClose={handleCloseModal}
          onConfirm={updateNews}
          open={showModal}
        />
      )}
    </div>
  );
}

export default News;
