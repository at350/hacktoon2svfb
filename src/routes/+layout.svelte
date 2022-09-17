<script>
    import App from "./fb";
    import { onMount } from "svelte";
    import { getAuth, onAuthStateChanged } from "firebase/auth";
    import { goto } from "$app/navigation";

    onMount(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("User is signed in");
            } else {
                goto('/login');
            }
        });
    });
</script>

<slot />
