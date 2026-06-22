type Blog = {
    id: number,
    title: string,
    url: string,
    author: string,
    likes: number
}

type NewBlogEntry = {
    title: string,
    url: string,
    author: string,
    likes: number
}


const blogs = [
    {
        id: 0,
        title: "Tailwind CSS vs Bootstrap 2026: The Definitive CSS Framework Comparison",
        url: "https://tech-insider.org/tailwind-css-vs-bootstrap-2026/",
        author: "Marcus Chen",
        likes: 0
    },
    {
        id: 1,
        title: "Guitarra clásica y popular: ¿cuáles son sus diferencias?",
        url: "https://www.cifraclub.com/blog/guitarra-clasica-y-popular/",
        author: "Gustavo Morais",
        likes: 0
    }
];

export const getBlogs = () => blogs;

export const getOneBlog = (id: number) => {
    return blogs.find(blog => blog.id === id);
}

export const addBlog = (newBlog: NewBlogEntry) => blogs.push({ id: blogs.length, title: newBlog.title, url: newBlog.url, author: newBlog.author, likes: newBlog.likes }); 