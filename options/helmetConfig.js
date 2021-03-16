module.exports = {
    referrerPolicy: { policy: "no-referrer" },
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ['unsafe-inline', `${process.env.BASE_URL}`],
            scriptSrc: ["'self'", "'unsafe-inline'", "https://code.jquery.com/", "https://ajax.aspnetcdn.com/", `${process.env.BASE_URL}`],
            imgSrc: ["'self'", "'unsafe-inline'", "https://cdn.channel.io/plugin/images/", 'data:'],
            objectSrc: ["'none'"]
        }
    }
}