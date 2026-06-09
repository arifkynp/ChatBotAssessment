import { useNavigate } from "@solidjs/router";
import { createSignal, onMount } from "solid-js";
import { login, register } from "~/services/auth.service";

export default function AuthPage() {
  const navigate = useNavigate();

  onMount(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/chat", { replace: true });
    }
  });

  const [isLogin, setIsLogin] = createSignal(true);

  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");

  const [loading, setLoading] = createSignal(false);
  const [error, setError] = createSignal("");

  const submit = async (e: Event) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      if (isLogin()) {
        const response = await login(
          email(),
          password()
        );

        localStorage.setItem(
          "token",
          response.token
        );

        navigate("/chat", { replace: true });
      } else {
        await register(
          email(),
          password()
        );

        setIsLogin(true);
      }
    } catch (err: any) {
      setError(
        err?.response?.data?.message ??
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="min-h-screen flex items-center justify-center bg-neutral-100">
      <div class="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h1 class="text-2xl font-bold text-center mb-2">
          Chatbot by ANP
        </h1>

        <p class="text-center text-gray-500 mb-6">
          {isLogin()
            ? "Sign in to continue"
            : "Create your account"}
        </p>

        <form
          onSubmit={submit}
          class="space-y-4"
        >
          <div>
            <label class="block mb-2 text-sm font-medium">
              Email
            </label>

            <input
              type="email"
              value={email()}
              onInput={(e) =>
                setEmail(
                  e.currentTarget.value
                )
              }
              class="w-full border rounded-lg px-4 py-3"
              placeholder="admin@example.com"
              required
            />
          </div>

          <div>
            <label class="block mb-2 text-sm font-medium">
              Password
            </label>

            <input
              type="password"
              value={password()}
              onInput={(e) =>
                setPassword(
                  e.currentTarget.value
                )
              }
              class="w-full border rounded-lg px-4 py-3"
              placeholder="••••••••"
              required
            />
          </div>

          {error() && (
            <div class="bg-red-100 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error()}
            </div>
          )}

          <button
            type="submit"
            disabled={loading()}
            class="w-full bg-black text-white py-3 rounded-lg"
          >
            {loading()
              ? "Please wait..."
              : isLogin()
              ? "Login"
              : "Register"}
          </button>
        </form>

        <div class="mt-6 text-center">
          <button
            class="text-sm text-blue-600 hover:underline"
            onClick={() =>
              setIsLogin(!isLogin())
            }
          >
            {isLogin()
              ? "Don't have an account? Register"
              : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  );
}