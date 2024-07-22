/* eslint-disable no-unused-vars */
import { Box } from "@chakra-ui/layout";
import SideDrawer from "../Components/SideDrawer";
import Chatbox from "../Components/Chatbox";
import MyChats from "../Components/MyChats";
import { useContext, useState } from "react";
import {SharedContext} from "../Context/SharedContext";

const ChatPage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = useContext(SharedContext);
  // const x = useContext(SharedContext);

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box display="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default ChatPage;
