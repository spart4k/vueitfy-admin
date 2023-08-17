import Nav from "@/components/Nav/default"
import Alert from '@/components/Alert'

export default {
    name: "App",
    components: {
        Alert,
        Nav
    },
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
                    title: "Специализации",
                    icon: "mdi-hard-hat",
                    route: "/specializations",
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
                    title: "Бронирование",
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
