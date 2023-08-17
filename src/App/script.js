export default {
    name: "App",

    data() {
        return {
            items: [
                {title: "Главная", icon: "mdi-cog", route: "/", group: true},
                {title: "Города", icon: "mdi-cog", route: "/cities", group: true},
                {
                    title: "Услуги",
                    icon: "mdi-cog",
                    route: "/services",
                    group: true,
                },
                {
                    title: "Клиенты",
                    icon: "mdi-cog",
                    route: "/classes",
                    group: true,
                },
                {
                    title: "Мастера",
                    icon: "mdi-cog",
                    route: "/categories",
                    group: true,
                },
                {
                    title: "Расписание",
                    icon: "mdi-cog",
                    route: "/categories",
                    group: true,
                },
                {title: "Жалобы", icon: "mdi-cog", route: "/categories", group: true},
                {title: "Счета", icon: "mdi-cog", route: "/categories", group: true},
                {title: "Уведомления", icon: "mdi-cog", route: "/categories", group: true}
            ],
        }
    },
    computed: {
        username() {
            return this.$store.state.auth.user;
        },
    },

    methods: {
        logout() {
            this.$store.dispatch("auth/logout")
            this.$router.push("/login")
        },
    },
}
