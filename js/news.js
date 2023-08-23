var news = new Vue({
    el: '#news',

    data() {
        return {
            newsItems: [],
            currentPage: 1,
            totalPages: 1,
            newsPerPage: 10,
        };
    },
    created() {
        this.fetchNews();
    },
    methods: {
        fetchNews() {
            const apiUrl = `https://flems.github.io/test/api/news/${this.currentPage}/`;
            const xhr = new XMLHttpRequest();

            xhr.open('GET', apiUrl);
            xhr.onreadystatechange = () => {
                console.log(xhr.readyState, xhr.status);
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        const data = JSON.parse(xhr.responseText);
                        console.log(data);
                        this.newsItems.push(...data.items);
                        this.currentPage = data.nav.current;
                        this.totalPages = data.nav.total;
                    } else {
                        console.error('Ошибка при получении данных:', xhr.statusText);
                    }
                }
            };
            xhr.onerror = () => {
                console.error('Ошибка при выполнении запроса');
            };
            xhr.send();
        },

        formatDateDay(timestamp) {
            const date = new Date(timestamp * 1000);
            return date.getDate();
        },
        formatDateMonth(timestamp) {
            const date = new Date(timestamp * 1000);
            return date.toLocaleString('en-US', { month: 'long' });
        },
        formatDateYear(timestamp) {
            const date = new Date(timestamp * 1000);
            return date.getFullYear();
        },

        loadNextPage() {
            this.currentPage++;
            this.fetchNews();
        },
        hasMorePages() {
            return this.currentPage < this.totalPages;
        }

    }


})