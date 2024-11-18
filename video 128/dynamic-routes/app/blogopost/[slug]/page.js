import React from 'react'

function page({params}) {
    if(params.slug == "python"){
        throw new Error("Errore aa gaya bhai")
    }
    console.log(params.slug)
    params.slug = params.slug.replaceAll("%2B","+")
    let languages = ["python","javascript", "java" ,"c++", "c#"];
    if(languages.includes(params.slug)){

        return (
          <div>
            slug {params.slug}
          </div>
        )
    }
  return (
    <div>
      post not found
    </div>
  )
}

export default page
