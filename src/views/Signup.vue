<template>
    <div class="signup">
        <div class="container-fluid mt-5">
            <div
                class="
                    row
                    d-flex
                    justify-content-center
                    align-items-center
                    h-100
                "
            >
                <div class="col-md-9 col-lg-6 col-xl-5 mb-lg-0 mb-3">
                    <img src="Signup.svg" class="img-fluid" alt="" />
                </div>
                <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1 mt-0">
                    <form>
                        <!-- Email input -->
                        <div class="form-outline mb-4">
                            <input
                                type="email"
                                id="form3Example3"
                                class="form-control form-control-lg"
                                placeholder="Enter a valid email address"
                                v-model="email"
                            />
                            <label class="form-label" for="form3Example3"
                                >Email address</label
                            >
                        </div>

                        <!-- Password input -->
                        <div class="form-outline mb-3">
                            <input
                                type="password"
                                id="form3Example4"
                                class="form-control form-control-lg"
                                placeholder="Enter password"
                                v-model="password"
                            />
                            <label class="form-label" for="form3Example4"
                                >Password</label
                            >
                        </div>

                        <div class="text-center text-lg-start mt-4 pt-2">
                            <button
                                type="button"
                                class="btn btn-primary btn-lg shadow"
                                style="
                                    padding-left: 2.5rem;
                                    padding-right: 2.5rem;
                                "
                                @click="createUser"
                            >
                                Signup
                            </button>

                            <p class="small fw-bold mt-2 pt-1 mb-0">
                                Already have an account?
                                <router-link
                                    class="link-danger"
                                    :to="{ name: 'Login' }"
                                    >Sign In</router-link
                                >
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Signup",
    computed: {
        email: {
            get() {
                return this.$store.state.authentication.email;
            },
            set(value) {
                this.$store.commit("updateEmail", value);
            },
        },
        password: {
            get() {
                return this.$store.state.authentication.password;
            },
            set(value) {
                this.$store.commit("updatePassword", value);
            },
        },
    },
    methods: {
        async createUser() {
            await this.$store.dispatch("createUser")
            this.$router.push({name: 'Home'})
        },
    },
    beforeRouteLeave(to,from,next) {
        this.$store.commit("resetStates");
        next();
    }
};
</script>
