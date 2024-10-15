import { Controller, useForm } from "react-hook-form";
import Input from "../core/Input";
import { useAuth } from "../hooks/useAuthentication";
import Button from "../core/Input/Button";
import { loginSchema } from "../schemas";

const Login = () => {
  const { mutateAsync, isPending } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (fields: any) => {
    await mutateAsync({
      email: fields?.email,
      password: fields?.password,
    });
  };

  return (
    <div className="container h-dvh text-center min-w-sm max-w-md m-auto flex justify-center align-middle flex-col">
      <h1 className="text-3xl font-bold mb-8">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          rules={loginSchema.email}
          render={({ field: { onChange, value } }) => (
            <Input
              label={"Email"}
              placeholder={"Email"}
              hasErrors={!!errors?.email}
              onChange={onChange}
              value={value}
              isLoading={isPending}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={loginSchema.password}
          render={({ field: { onChange, value } }) => (
            <Input
              label={"Password"}
              placeholder={"Password"}
              hasErrors={!!errors?.password}
              onChange={onChange}
              value={value}
              type="password"
            />
          )}
        />
        <Button
          type="submit"
          isLoading={isPending}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Login;
