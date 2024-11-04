export const sendMessage = async(req, res) => {
   try {
     console.log("message sent");
   } catch (error) {
    console.log("Error in sendMessage controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
   }
}
