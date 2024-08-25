new Vue({
    el: '#app',
    data: {
        updateMessage: "Welcome to the latest updates and notices!",
        searchQuery: '',
        subjects: [
            { id: 1, name: 'Mathematics', likes: 0, rating: 0, feedback: '' },
            { id: 2, name: 'Science', likes: 0, rating: 0, feedback: '' },
            { id: 3, name: 'History', likes: 0, rating: 0, feedback: '' }
        ]
    },
    computed: {
        filteredSubjects() {
            return this.subjects.filter(subject => 
                subject.name.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        }
    },
    methods: {
        likeSubject(id) {
            const subject = this.subjects.find(sub => sub.id === id);
            subject.likes++;
        },
        rateSubject(id) {
            const subject = this.subjects.find(sub => sub.id === id);
            const newRating = prompt("Rate this subject out of 5:");
            if (newRating > 0 && newRating <= 5) {
                subject.rating = newRating;
            }
        }
    }
});
