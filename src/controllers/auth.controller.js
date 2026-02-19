const registerUser = async (req, res) => {
    try {
        console.log('Registering user:');
        res.json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to register user" });
        console.error("Error registering user:", error);
    }
}


export { registerUser };