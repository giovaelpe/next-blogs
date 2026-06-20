type Blog = {
    title: string,
    url: string,
    author: string,
    likes: number
}


const blogs = [
    {
        title: "Tailwind CSS vs Bootstrap 2026: The Definitive CSS Framework Comparison",
        url: "https://tech-insider.org/tailwind-css-vs-bootstrap-2026/",
        author : "Marcus Chen",
        likes: 0
    },
    {
        title: "Guitarra clásica y popular: ¿cuáles son sus diferencias?",
        url: "https://www.cifraclub.com/blog/guitarra-clasica-y-popular/",
        author : "Gustavo Morais",
        likes: 0
    }
];

export const getBlogs = () => blogs;

export const addBlog = (newBlog:Blog) => blogs.push(newBlog); 