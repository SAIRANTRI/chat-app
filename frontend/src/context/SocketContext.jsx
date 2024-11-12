import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
	return useContext(SocketContext);
};

/*************  ✨ Codeium Command ⭐  *************/
/**
 * SocketContextProvider is a component that provides a socket.io client to the React application.
 * The socket is created when a user logs in, and it is closed when the user logs out.
 * The socket is used to listen to the "getOnlineUsers" event, which is emitted by the server when
 * a user logs in or logs out.
 *
 * The SocketContextProvider component accepts a children prop, which is the component that will
 * receive the socket.io client as a prop.
 *
 * The SocketContextProvider component returns a SocketContext.Provider component, which wraps the
/******  a89ad0fe-6310-4bc8-9b60-99b54882eee4  *******/
export const SocketContextProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);
	const { authUser } = useAuthContext();

	useEffect(() => {
		if (authUser) {
			const socket = io("http://localhost:5000", {
				query: {
					userId: authUser._id,
				},
			});

			setSocket(socket);

			// socket.on() is used to listen to the events. can be used both on client and server side
			socket.on("getOnlineUsers", (users) => {
				setOnlineUsers(users);
			});

			return () => socket.close();
		} else {
			if (socket) {
				socket.close();
				setSocket(null);
			}
		}
	}, [authUser]);

	return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>;
};