export class Logger {
    static log(eventType, post) {
        console.log(`[${new Date().toISOString()}] ${eventType}: Post "${post.title}" (ID: ${post.id})`);
    }
}