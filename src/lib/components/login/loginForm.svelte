<script>
    import { goto } from "$app/navigation";
    import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

    export let title;

    const auth = getAuth();

    let showNotFound = false;

    function login() {
        let email = document.getElementById("emailInput").value;
        let password = document.getElementById("passInput").value;
        if (title == "Login") {
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                localStorage.setItem("uid", user.uid)
                goto("/")
            })
            .catch((error) => {
                console.error(error);
                showNotFound = true;
            });
        }
        else {
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                localStorage.setItem("uid", user.uid)
                goto("/")
            })
            .catch((error) => {
                console.error(error);
            });
        }
    }
</script>

<div class="login">
    <div class="card">
      <div class="card-body login-form">
        <h5 class="card-title">{title}</h5>
        <form on:submit|preventDefault={login}>
          <div class="mb-3">
            <label for="emailInput" class="form-label">Email address</label>
            <input
              type="email"
              class="form-control"
              id="emailInput"
              aria-describedby="emailHelp"
              placeholder="Email Address"
              required
            />
          </div>
          <div class="mb-3">
            <label for="passInput" class="form-label">
                {#if title == "Login"}
                    Password
                {:else}
                    Password (min 6 characters)
                {/if}
            </label>
            <input
              type="password"
              class="form-control"
              id="passInput"
              placeholder="Password"
              required
              pattern=".{6}"
            />
          </div>
          {#if showNotFound}
            <p class="warningLogin">
                Invalid login.
            </p>
          {/if}
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
        {#if title == "Login"}
          <p class="float-end mt-3">
            Not a user? <a href="/signup" class="card-link">Sign Up</a>
          </p>
        {/if}
      </div>
    </div>
  </div>
  
  <style>
    .card {
      width: 50%;
      margin: 0 auto;
    }
    .login {
      margin-top: 50px;
      margin-bottom: 50px;
    }
    .login-form {
      width: 60%;
      margin: 0 auto;
    }
    @media only screen and (min-device-width: 320px) and (max-device-width: 480px) {
      .login-form {
        width: 90%;
      }
      .card {
        width: 90%;
      }
    }

    .warningLogin {
        color: red;
        font-weight: 700;
    }
  </style>