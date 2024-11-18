"use client"

export default function Home() {
  const handleClick = async() =>{
    let data = {
      name : "HItesh",
      position : "Student"
    }
    let a = await fetch("/api/add", {
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)

    })
    let res = await a.json();
    console.log(res);
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
       hello world
       <button onClick={handleClick}>click Me</button>
    </main>
  );
}
