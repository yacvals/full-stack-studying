import { PostRepository } from './PostRepository.js';

export class InMemoryPostRepository extends PostRepository {
    constructor() {
        super();
        this.posts = [
            {
                id: 1,
                title: "The Rise of Decentralized Finance",
                content: "Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry. It refers to the shift from traditional, centralized financial systems to peer-to-peer finance enabled by decentralized technologies built on Ethereum and other blockchains. With the promise of reduced dependency on the traditional banking sector, DeFi platforms offer a wide range of services, from lending and borrowing to insurance and trading.",
                author: "Alex Thompson",
                date: "2023-08-01T10:00:00Z",
            },
            {
                id: 2,
                title: "The Impact of Artificial Intelligence on Modern Businesses",
                content: "Artificial Intelligence (AI) is no longer a concept of the future. It's very much a part of our present, reshaping industries and enhancing the capabilities of existing systems. From automating routine tasks to offering intelligent insights, AI is proving to be a boon for businesses. With advancements in machine learning and deep learning, businesses can now address previously insurmountable problems and tap into new opportunities.",
                author: "Mia Williams",
                date: "2023-08-05T14:30:00Z",
            },
            {
                id: 3,
                title: "Sustainable Living: Tips for an Eco-Friendly Lifestyle",
                content: "Sustainability is more than just a buzzword; it's a way of life. As the effects of climate change become more pronounced, there's a growing realization about the need to live sustainably. From reducing waste and conserving energy to supporting eco-friendly products, there are numerous ways we can make our daily lives more environmentally friendly. This post will explore practical tips and habits that can make a significant difference.",
                author: "Samuel Green",
                date: "2023-08-10T09:15:00Z",
            },
        ];
        this.lastId = 3;
    }

    getAllPosts() {
        return this.posts;
    }

    getPostById(id) {
        return this.posts.find(post => post.id === id);
    }

    createPost(postData) {
        const newPost = {
            id: ++this.lastId,
            ...postData,
            date: new Date().toISOString()
        };
        this.posts.push(newPost);
        return newPost;
    }

    updatePost(id, updateData) {
        const index = this.posts.findIndex(post => post.id === id);
        if (index === -1) return null;
        
        const updatedPost = {
            ...this.posts[index],
            ...updateData,
            id // Забезпечуємо, що ID не змінюється
        };
        this.posts[index] = updatedPost;
        return updatedPost;
    }

    deletePost(id) {
        const index = this.posts.findIndex(post => post.id === id);
        if (index === -1) return false;
        
        this.posts.splice(index, 1);
        return true;
    }
}