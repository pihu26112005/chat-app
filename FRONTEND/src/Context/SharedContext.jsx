/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useToast } from "@chakra-ui/toast";


export const SharedContext = createContext(null);

const SharedContextProvider = ({ children }) => {

    const [selectedChat, setSelectedChat] = useState();
    const [user, setUser] = useState();
    const [notification, setNotification] = useState([]);
    const [chats, setChats] = useState();

    const toast = useToast();

    const navigate = useNavigate();

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setUser(userInfo);

          if (!userInfo) navigate("/");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigate]);





    // useEffect(() => {
    //     console.log(user);
    //   }, [user]);

    // useEffect(() => {
    //     console.log(selectedChat);
    //   }, [selectedChat]);


    const Contextvalue = {
        selectedChat,
        setSelectedChat,
        user,
        setUser,
        notification,
        setNotification,
        chats,
        setChats,
    }

    return (
        <SharedContext.Provider value={Contextvalue}>
            {children}
        </SharedContext.Provider>
    )
};

export default SharedContextProvider;
