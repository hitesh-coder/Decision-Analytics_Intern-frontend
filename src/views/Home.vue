<template>
    <div class="home container">
        <div class="text-center d-flex flex-column justify-content-center align-items-center" v-if="meetSchedule == ''">
            <span class="fw-bold fs-3">No Meet Schedule</span>
            <img src="/Empty.svg" class="img-fluid" alt="">
        </div>
        <div class="row g-4">
            <div
                class="col-lg-3 col-md-4 col-sm-6"
                v-for="meet in meetSchedule"
                :key="meet"
            >
                <div class="card rounded shadow-sm">
                    <img :src="meet.image" alt="image" v-if="meet.image" />
                    <img
                        class="card-img-top"
                        src="/Meeting.svg"
                        alt="image"
                        v-else
                    />
                    <div class="card-body">
                        <h5 class="card-title">{{ meet.title }}</h5>
                        <p class="card-text" v-if="meet.description">
                            {{ meet.description }}
                        </p>
                        <p class="fw-lighter" v-if="meet.date">
                            {{ meet.date }}
                        </p>
                        <p class="fw-lighter" v-if="meet.start">
                            <span class="fw-bold">From:</span> {{ meet.start }}
                        </p>
                        <p class="fw-lighter" v-if="meet.end">
                            <span class="fw-bold">End:</span> {{ meet.date }}
                        </p>
                        <div
                            class="
                                d-flex
                                justify-content-between
                                align-items-center
                            "
                        >
                            <a
                                :href="meet.link"
                                target="_blank"
                                class="btn btn-primary"
                                v-if="meet.link"
                                >Go to Meet</a
                            >
                            <div class="icons">
                                <span
                                    class="material-icons text-danger m-1"
                                    @click="deleteMeet(meet._id)"
                                >
                                    delete
                                </span>
                                <span
                                    class="material-icons text-primary m-1"
                                    data-bs-toggle="modal"
                                    data-bs-target="#AddMeet"
                                    @click="getParticularMeet(meet._id)"
                                >
                                    edit
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <span
            class="material-icons p-3 shadow rounded-circle adding-button"
            data-bs-toggle="modal"
            data-bs-target="#AddMeet"
            @click="setEditModeFalse"
        >
            add
        </span>

        <!-- Modal -->
        <div
            class="modal fade"
            id="AddMeet"
            tabindex="-1"
            aria-labelledby="AddMeetLabel"
            aria-hidden="true"
        >
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="AddMeetLabel">
                            Schedule a Meet
                        </h5>
                        <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="mb-3">
                                <label for="title" class="col-form-label">
                                    Title:<span class="text-danger">*</span>
                                </label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="title"
                                    placeholder="Title"
                                    v-model="title"
                                />
                            </div>
                            <div class="mb-3">
                                <label for="description" class="col-form-label"
                                    >Description:</label
                                >
                                <input
                                    type="text"
                                    class="form-control"
                                    id="description"
                                    placeholder="Description"
                                    v-model="description"
                                />
                            </div>
                            <div class="mb-3">
                                <label for="link" class="col-form-label"
                                    >Meet Link:</label
                                >
                                <input
                                    type="text"
                                    class="form-control"
                                    id="link"
                                    placeholder="Please Enter Meet Link"
                                    v-model="link"
                                />
                            </div>
                            <div class="mb-3">
                                <label for="image" class="col-form-label"
                                    >Background Image Link:</label
                                >
                                <input
                                    type="text"
                                    class="form-control"
                                    id="image"
                                    placeholder="Please enter image link"
                                    v-model="image"
                                />
                            </div>
                            <div class="mb-3">
                                <label for="date" class="col-form-label"
                                    >Date:</label
                                >
                                <input
                                    type="date"
                                    class="form-control"
                                    id="date"
                                    v-model="date"
                                />
                            </div>
                            <div class="mb-3">
                                <label for="start" class="col-form-label"
                                    >Start From:</label
                                >
                                <input
                                    type="time"
                                    class="form-control"
                                    id="start"
                                    placeholder="hrs:mins"
                                    pattern="^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$"
                                    v-model="start"
                                />
                            </div>
                            <div class="mb-3">
                                <label for="end" class="col-form-label"
                                    >End Till:</label
                                >
                                <input
                                    type="time"
                                    class="form-control"
                                    id="end"
                                    placeholder="hrs:mins"
                                    v-model="end"
                                />
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            Close
                        </button>
                        <button
                            type="button"
                            class="btn btn-primary"
                            data-bs-dismiss="modal"
                            @click="uploadMeetDetail"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src

export default {
    name: "Home",
    data() {
        return {
            meetId: "",
        };
    },
    components: {},
    computed: {
        meetSchedule() {
            return this.$store.getters.meetSchedule;
        },
        title: {
            get() {
                return this.$store.state.newMeet.title;
            },
            set(value) {
                this.$store.commit("updateTitle", value);
            },
        },
        description: {
            get() {
                return this.$store.state.newMeet.description;
            },
            set(value) {
                this.$store.commit("updateDescription", value);
            },
        },
        link: {
            get() {
                return this.$store.state.newMeet.link;
            },
            set(value) {
                this.$store.commit("updateLink", value);
            },
        },
        date: {
            get() {
                return this.$store.state.newMeet.date;
            },
            set(value) {
                this.$store.commit("updateDate", value);
            },
        },
        image: {
            get() {
                return this.$store.state.newMeet.image;
            },
            set(value) {
                this.$store.commit("updateImage", value);
            },
        },
        start: {
            get() {
                return this.$store.state.newMeet.start;
            },
            set(value) {
                this.$store.commit("updateStart", value);
            },
        },
        end: {
            get() {
                return this.$store.state.newMeet.end;
            },
            set(value) {
                this.$store.commit("updateEnd", value);
            },
        },
        editMode() {
            return this.$store.getters.editMode;
        },
    },
    async created() {
        await this.$store.dispatch("getMeetSchedule");
    },
    methods: {
        async uploadMeetDetail() {
            if (this.editMode) {
                await this.$store.dispatch("deleteMeet", this.meetId);
            }
            await this.$store.dispatch("uploadMeetDetail");
            this.$store.commit(
                "updateSuccessMessage",
                "Meet Schedule Successfully"
            );
            await this.$store.dispatch("getMeetSchedule");
            this.$store.commit("setEditModeFalse");
            this.meetId = "";
        },
        async deleteMeet(id) {
            await this.$store.dispatch("deleteMeet", id);
            await this.$store.dispatch("getMeetSchedule");
        },
        async getParticularMeet(id) {
            this.$store.commit("setEditModeTrue");
            this.meetId = id;
            await this.$store.dispatch("getParticularMeet", id);
            await this.$store.dispatch("getMeetSchedule");
        },
        async setEditModeFalse() {
            this.$store.commit("setEditModeFalse");
            this.$store.commit("resetMeetSchedule");
        },
    },
};
</script>

<style lang="scss" scoped>
.adding-button {
    position: fixed;
    bottom: 5%;
    right: 2%;
}
.material-icons {
    cursor: pointer;
}
</style>