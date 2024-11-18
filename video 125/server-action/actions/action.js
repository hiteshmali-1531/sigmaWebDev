"use server"
import fs from 'fs/promises'

export const handleSubmit = async(e)=>{
    let name = e.get("name")
    let email = e.get("email");
    console.log(name, email)
    await fs.writeFile("hitesh.txt", `hello this is server action name is ${name} and email is ${email}`  )

  }