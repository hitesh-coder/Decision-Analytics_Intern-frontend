<template>
    <div class="login">
        <div class="container-fluid mt-5">
            <div
                class="
                    row
                    d-flex
                    justify-content-center
                    align-items-center
                "
            >
                <div class="col-md-9 col-lg-6 col-xl-5 mb-lg-0 mb-3">
                    <img src="/Login.svg" class="img-fluid" alt="" />
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

                        <div
                            class="
                                d-flex
                                justify-content-between
                                align-items-center
                            "
                        >
                            <!-- Checkbox -->
                            <div class="form-check mb-0">
                                <input
                                    class="form-check-input me-2"
                                    type="checkbox"
                                    value=""
                                    id="form2Example3"
                                />
                                <label
                                    class="form-check-label"
                                    for="form2Example3"
                                >
                                    Remember me
                                </label>
                            </div>
                        </div>

                        <div class="text-center text-lg-start mt-4 pt-2">
                            <button
                                type="button"
                                class="btn btn-primary btn-lg shadow"
                                style="
                                    padding-left: 2.5rem;
                                    padding-right: 2.5rem;
                                "
                                @click="loginUser"
                            >
                                Login
                            </button>

                            <p class="small fw-bold mt-2 pt-1 mb-0">
                                Don't have an account?
                                <router-link
                                    class="link-danger"
                                    :to="{ name: 'Signup' }"
                                    >Register</router-link
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
    name: "Login",
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
        async loginUser() {
            await this.$store.dispatch("loginUser")
            this.$router.push({name: 'Home'})
        },
    },
    beforeRouteLeave(to,from,next) {
        this.$store.commit("resetStates");
        next();
    }
}
</script>
