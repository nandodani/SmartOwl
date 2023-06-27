import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  getDoc,
} from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBgbU5-We17msq5Sl7VGRyzT4NeaLTD4NI",
  authDomain: "smartowl-6138f.firebaseapp.com",
  projectId: "smartowl-6138f",
  storageBucket: "smartowl-6138f.appspot.com",
  messagingSenderId: "658946826556",
  appId: "1:658946826556:web:94dd318339253d30407e39",
  measurementId: "G-ENMTNNWY06",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const userId = localStorage.getItem("uid");
const workspaceId = localStorage.getItem("WorkspaceId");

export const getFirestoreData = async () => {
  try {
    const userRef = db.collection("users").doc(userId);
    const userDoc = await userRef.get();
    const userData = userDoc.data();

    const workspacesRef = db.collection("users", userId, "workspaces");
    const workspacesSnapshot = await workspacesRef.get();
    const workspaceData = workspacesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log("Utilizador: ", userData);
    console.log("Workspaces Data na firebase.js: ", workspaceData);

    return { user: userData, workspaces: workspaceData };
  } catch (error) {
    console.log("ERRO no getFirestoreData: " + error);
    return null;
  }
};

getFirestoreData()
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  });

export const getWorkspace = async (userId) => {
  const userRef = collection(db, `users/${userId}/workspaces`);
  try {
    const querySnapshot = await query(userRef, orderBy("createdAt"));

    const data = await getDocs(querySnapshot);
    const workspaceData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return workspaceData;
  } catch (error) {
    console.log("ERRO no getWorkspaceData: " + error);
    return [];
  }
};

export const createWorkspace = async (userId, workspaceData, newsData) => {
  try {
    const userRef = doc(db, "users", userId);
    const workspacesCollectionRef = collection(userRef, "workspaces");
    const workspaceRef = await addDoc(workspacesCollectionRef, workspaceData);
    console.log("Workspace criado com sucesso!", workspaceRef.id);

    const remindersCollectionRef = collection(workspaceRef, "reminders");
    const tasksCollectionRef = collection(workspaceRef, "tasks");
    const notesCollectionRef = collection(workspaceRef, "notes");

    const newsCollectionRef = collection(workspaceRef, "news");
    await addDoc(newsCollectionRef, newsData);

    const reminderData = {
      completed: false,
      title: "My first reminder",
      date: new Date(),
    };

    reminderData.date.setHours(reminderData.date.getHours() + 1);

    await addDoc(remindersCollectionRef, reminderData);

    const taskData = {
      title: "My first task",
      completed: false,
      createdAt: new Date(),
    };

    await addDoc(tasksCollectionRef, taskData);

    const noteData = {
      title: "My first note",
      text: "This is my first note. Excited to start organizing my thoughts and ideas in this widget. Let's begin this journey of productivity and creativity together. Stay tuned for more updates!",
      createdAt: new Date(),
    };

    await addDoc(notesCollectionRef, noteData);

    localStorage.setItem("WorkspaceId", workspaceRef.id);

    return workspaceRef.id;
  } catch (error) {
    console.error("Erro ao criar o workspace:", error);
    throw error;
  }
};

// News
export const getNewsData = async (userId, workspaceId) => {
  const workspaceDocRef = doc(db, `users/${userId}/workspaces/${workspaceId}`);
  const newsCollectionRef = collection(workspaceDocRef, "news");

  try {
    const querySnapshot = await getDocs(newsCollectionRef);
    const newsData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log(" News Data na firebase.js:", newsData);
    return newsData;
  } catch (error) {
    console.error("Error fetching news:", error);
    throw new Error("Failed to fetch news");
  }
};

export const editNewsData = async (
  userId,
  workspaceId,
  newsId,
  updatedData
) => {
  try {
    const workspaceNewsDocRef = doc(
      db,
      `users/${userId}/workspaces/${workspaceId}/news/${newsId}`
    );
    const workspaceNewsDocSnapshot = await getDoc(workspaceNewsDocRef);

    if (workspaceNewsDocSnapshot.exists()) {
      await updateDoc(workspaceNewsDocRef, updatedData);
      console.log("Dados de notícia atualizados com sucesso!", updatedData);
    } else {
      console.error("Erro: O documento da notícia não existe.");
    }
  } catch (error) {
    console.error("Erro ao atualizar os dados de notícia:", error);
  }
};

//Tasks
export const fetchTasks = async (userId, workspaceId) => {
  const workspaceDocRef = doc(db, `users/${userId}/workspaces/${workspaceId}`);
  const tasksCollectionRef = collection(workspaceDocRef, "tasks");
  const tasksQuery = query(tasksCollectionRef, orderBy("completed"));

  try {
    const querySnapshot = await getDocs(tasksQuery);
    const tasksData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return tasksData;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw new Error("Failed to fetch tasks");
  }
};

export const createTask = async (userId, workspaceId, newTask) => {
  const workspaceDocRef = doc(db, `users/${userId}/workspaces/${workspaceId}`);
  const tasksCollectionRef = collection(workspaceDocRef, "tasks");
  const newTaskRef = await addDoc(tasksCollectionRef, newTask);
  return newTaskRef.id;
};

export const deleteTask = async (userId, workspaceId, taskId) => {
  console.log(userId, workspaceId, taskId);
  try {
    const taskDocRef = doc(
      db,
      `users/${userId}/workspaces/${workspaceId}/tasks`,
      taskId
    );

    await deleteDoc(taskDocRef);
    console.log("Task deleted successfully");
  } catch (error) {
    console.error("Error deleting task:", error);
    throw new Error("Failed to delete task");
  }
};

export const updateTask = async (userId, workspaceId, taskId, updatedTask) => {
  try {
    const taskDocRef = doc(
      db,
      `users/${userId}/workspaces/${workspaceId}/tasks`,
      taskId
    );

    await updateDoc(taskDocRef, updatedTask);
    console.log("Task updated successfully");
  } catch (error) {
    console.error("Error updating task:", error);
    throw new Error("Failed to update task");
  }
};

//Remiders

export const fetchReminders = async (userId, workspaceId) => {
  const workspaceDocRef = doc(db, `users/${userId}/workspaces/${workspaceId}`);
  const remindersCollectionRef = collection(workspaceDocRef, "reminders");
  const remindersQuery = query(remindersCollectionRef, orderBy("date"));

  try {
    const querySnapshot = await getDocs(remindersQuery);
    const remindersData = querySnapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      .filter((reminders) => reminders.completed === false);
    return remindersData;
  } catch (error) {
    console.error("Error fetching reminders:", error);
    throw new Error("Failed to fetch reminders");
  }
};

export const createReminder = async (userId, workspaceId, newReminder) => {
  const workspaceDocRef = doc(db, `users/${userId}/workspaces/${workspaceId}`);
  const remindersCollectionRef = collection(workspaceDocRef, "reminders");
  const newReminderRef = await addDoc(remindersCollectionRef, newReminder);
  return newReminderRef.id;
};

export const deleteReminder = async (userId, workspaceId, reminderId) => {
  console.log(userId, workspaceId, reminderId);
  try {
    const reminderDocRef = doc(
      db,
      `users/${userId}/workspaces/${workspaceId}/reminders`,
      reminderId
    );

    await deleteDoc(reminderDocRef);
    console.log("Reminder deleted successfully");
  } catch (error) {
    console.error("Error deleting reminder:", error);
    throw new Error("Failed to delete reminder");
  }
};

export const updateReminder = async (
  userId,
  workspaceId,
  reminderId,
  updatedReminder
) => {
  try {
    const reminderDocRef = doc(
      db,
      `users/${userId}/workspaces/${workspaceId}/reminders`,
      reminderId
    );

    await updateDoc(reminderDocRef, updatedReminder);
    console.log("Reminder updated successfully");
  } catch (error) {
    console.error("Error updating reminder:", error);
    throw new Error("Failed to update reminder");
  }
};

//Notes
export const fetchNotes = async (userId, workspaceId) => {
  const workspaceDocRef = doc(db, `users/${userId}/workspaces/${workspaceId}`);
  const notesCollectionRef = collection(workspaceDocRef, "notes");
  const notesQuery = query(notesCollectionRef, orderBy("createdAt"));

  try {
    const querySnapshot = await getDocs(notesQuery);
    const notesData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return notesData;
  } catch (error) {
    console.error("Error fetching notes:", error);
    throw new Error("Failed to fetch notes");
  }
};

export const createNote = async (userId, workspaceId, newNote) => {
  const workspaceDocRef = doc(db, `users/${userId}/workspaces/${workspaceId}`);
  const notesCollectionRef = collection(workspaceDocRef, "notes");
  const newNoteRef = await addDoc(notesCollectionRef, newNote);
  return newNoteRef.id;
};

export const deleteNote = async (userId, workspaceId, noteId) => {
  console.log(userId, workspaceId, noteId);
  try {
    const noteDocRef = doc(
      db,
      `users/${userId}/workspaces/${workspaceId}/notes`,
      noteId
    );

    await deleteDoc(noteDocRef);
    console.log("Note deleted successfully");
  } catch (error) {
    console.error("Error deleting task:", error);
    throw new Error("Failed to delete task");
  }
};

export const updateNote = async (userId, workspaceId, noteId, updatedNote) => {
  try {
    const taskDocRef = doc(
      db,
      `users/${userId}/workspaces/${workspaceId}/notes`,
      noteId
    );

    await updateDoc(taskDocRef, updatedNote);
    console.log("Note updated successfully");
  } catch (error) {
    console.error("Error updating task:", error);
    throw new Error("Failed to update task");
  }
};

// Quick Links

export const fetchQuickLinks = async (userId, workspaceId) => {
  const workspaceDocRef = doc(db, `users/${userId}/workspaces/${workspaceId}`);
  const quicklinksCollectionRef = collection(workspaceDocRef, "quicklinks");
  const quicklinksQuery = query(quicklinksCollectionRef, orderBy("createdAt"));

  try {
    const querySnapshot = await getDocs(quicklinksQuery);
    const quicklinksData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return quicklinksData;
  } catch (error) {
    console.error("Error fetching quicklinks:", error);
    throw new Error("Failed to fetch quicklinks");
  }
};

export const createQuickLink = async (userId, workspaceId, newQuickLink) => {
  const workspaceDocRef = doc(db, `users/${userId}/workspaces/${workspaceId}`);
  const quicklinksCollectionRef = collection(workspaceDocRef, "quicklinks");
  const newQuickLinkRef = await addDoc(quicklinksCollectionRef, newQuickLink);
  return newQuickLinkRef.id;
};

export const deleteQuickLink = async (userId, workspaceId, quickLinkId) => {
  console.log(userId, workspaceId, quickLinkId);
  try {
    const quickLinkDocRef = doc(
      db,
      `users/${userId}/workspaces/${workspaceId}/quicklinks`,
      quickLinkId
    );

    await deleteDoc(quickLinkDocRef);
    console.log("QuickLink deleted successfully");
  } catch (error) {
    console.error("Error deleting quickLink:", error);
    throw new Error("Failed to delete quickLink");
  }
};

export const updateQuickLink = async (
  userId,
  workspaceId,
  quickLinkId,
  updatedQuickLink
) => {
  try {
    const quickLinkDocRef = doc(
      db,
      `users/${userId}/workspaces/${workspaceId}/quicklinks`,
      quickLinkId
    );

    await updateDoc(quickLinkDocRef, updatedQuickLink);
    console.log("QuickLink updated successfully");
  } catch (error) {
    console.error("Error updating quickLink:", error);
    throw new Error("Failed to update quickLink");
  }
};

//Events
export const fetchEvents = async (userId, workspaceId) => {
  const workspaceDocRef = doc(db, `users/${userId}/workspaces/${workspaceId}`);
  const eventsCollectionRef = collection(workspaceDocRef, "events");
  const eventsQuery = query(eventsCollectionRef, orderBy("date"));

  try {
    const querySnapshot = await getDocs(eventsQuery);
    const eventsData = querySnapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      .filter((events) => events.completed === false);
    return eventsData;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw new Error("Failed to fetch events");
  }
};

export const createEvent = async (userId, workspaceId, newEvent) => {
  const workspaceDocRef = doc(db, `users/${userId}/workspaces/${workspaceId}`);
  const eventsCollectionRef = collection(workspaceDocRef, "events");
  const newEventRef = await addDoc(eventsCollectionRef, newEvent);
  return newEventRef.id;
};

export const deleteEvent = async (userId, workspaceId, eventId) => {
  console.log(userId, workspaceId, eventId);
  try {
    const eventDocRef = doc(
      db,
      `users/${userId}/workspaces/${workspaceId}/events`,
      eventId
    );

    await deleteDoc(eventDocRef);
    console.log("Event deleted successfully");
  } catch (error) {
    console.error("Error deleting event:", error);
    throw new Error("Failed to delete event");
  }
};

export const updateEvent = async (
  userId,
  workspaceId,
  eventId,
  updatedEvent
) => {
  try {
    const eventDocRef = doc(
      db,
      `users/${userId}/workspaces/${workspaceId}/events`,
      eventId
    );

    await updateDoc(eventDocRef, updatedEvent);
    console.log("Event updated successfully");
  } catch (error) {
    console.error("Error updating event:", error);
    throw new Error("Failed to update event");
  }
};
