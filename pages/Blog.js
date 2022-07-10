import React, { useState, useEffect } from "react"
import Image from "next/image"
import moment from "moment"

const Blog = () => {


  const [data, setData] = useState([])

  const getPosts = async () => {
    try {
      const respose = await fetch('https://dev.to/api/articles?username=nitinreddy3')
      const data = await respose.json()
      setData(data);
    } catch (err) {
      throw new Error(err)
      console.error(err);
    }
  }

  useEffect(() => {
    getPosts();
  }, []);

  const showPosts = () => data?.map(({ title, url, published_timestamp, cover_image, tag_list, id }) =>
    <a className="card w-96 m-8 border-2" href={url} target="_blank" key={id}>
      <h2 className="flex mb-2"><i>{moment(published_timestamp).format('ll')}</i></h2>
      < Image src={cover_image} alt={title} width="300" height="150" />
      <p>{title}</p>
      <div className="px-1 pt-4">
        {
          tag_list.map(tag => <span key={`${id}-${tag}`} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{`#${tag}`}</span>)}

      </div>
    </a>);

  return (
    <div className="container px-4 mx-auto lg:max-w-4xl flex items-center justify-between">
      <div className="lg:space-x-12 lg:flex lg:flex-row item-center lg:-mx-4 flex flex-col-reverse text-center lg:text-left">
        <div className="lg:mt-12">
          <h1 className="text-center text-2xl font-bold text-emerald-900 lg:text-5xl dark:text-white">
            Blogs
          </h1>
          <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full text-emerald-800 dark:text-white">
            <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
              {data.length ? showPosts() :
                <div className="animate-pulse flex space-x-4">
                  <div className="rounded-full bg-slate-700 h-10 w-10"></div>
                  <div className="flex-1 space-y-6 py-1">
                    <div className="h-2 bg-slate-700 rounded"></div>
                    <div className="space-y-3">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                        <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                      </div>
                      <div className="h-2 bg-slate-700 rounded"></div>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Blog;