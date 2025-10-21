const apiurl= "http://localhost:8080/api/users"
const UserService={

    getEmployeeLogin: async (mail, password) => {
        try {
            const response = await fetch(`${apiurl}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: mail,
                    password: password
                })
            });

            if (!response.ok) throw new Error("Erreur de récupération des données");
            const responset=await response.json();
            return responset;
        } catch (error) {
            console.error("Erreur de login :", error);
        }
    }
}
export default UserService