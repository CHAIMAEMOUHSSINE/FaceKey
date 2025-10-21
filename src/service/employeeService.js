const apiurl= "http://localhost:8080/api/employees/dashboard"
const EmployeeService={
    getEmployee:async(id)=>{
        try{
            const response=await fetch(`${apiurl}/${id}`)
            if(!response.ok)throw new Error("erreur de recuperation de donnée ")
            return await response.json()

        }catch(error){
            console.error(error)
        }

    },

    getEmployees:async()=>{
        try{
            const response=await fetch(`${apiurl}`,{

                method:"GET"
            })
            if(!response.ok)throw new Error("erreur de recuperation de donnée haha")
            return await response.json()

        }catch(error){
            console.error(error)
        }

    },
    getEmployeeLogin:async(mail, password)=>{
        try{
            const response=await fetch(`${apiurl}/login?username=${mail}&password=${password}`,{

                method:"GET"
            })
            if(!response.ok)throw new Error("erreur de recuperation de donnée ")
            return await response.json()

        }catch(error){
            console.error(error)
        }

    },
    getEmployeeCsv:async(id)=>{
        try{
            const response=await ffetch(`http://localhost:8080/api/employees/csv/${id}`,{

                method:"GET"
            })
            if(!response.ok)throw new Error("erreur de recuperation de donnée haha")
            return await response.json();

        }catch(error){
            console.error(error)
        }

    }

}
export default EmployeeService