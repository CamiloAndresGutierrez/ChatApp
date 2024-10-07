import { Controller, useForm } from "react-hook-form";
import { emailRegex } from "../../utils/regexValidations";
import Input from "../../core/Input";
import { useMutation } from "@tanstack/react-query";
import Api from "../../services/Api";

const Login = () => {
  const { mutateAsync } = useMutation({
    mutationFn: ({email, password}: {email: string, password: string}) => Api.post("/login", {
      email,
      password
    })
  });

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

  const onSubmit = (fields: any) => {
    console.log("Hello there");
    console.log(fields);
    mutateAsync({
      email: fields?.email,
      password: fields?.password
    })
  };

  const schema = {
    email: {
      pattern: emailRegex,
      required: true,
    },
    password: {
      maxLength: 20,
      required: true,
    },
  };

  return (
    <div className="container h-dvh text-center min-w-sm max-w-md m-auto flex justify-center align-middle flex-col">
      <h1 className="text-3xl font-bold mb-8">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          rules={schema.email}
          render={({ field }) => <Input placeholder={"Email"} {...field} />}
        />

        <Controller
          name="password"
          control={control}
          rules={schema.password}
          render={({ field }) => (
            <Input placeholder={"Password"} {...field} type="password" />
          )}
        />

        <button
          type="submit"
          className="bg-sky-500 block w-full rounded-md border-0 py-1.5 pl-2 pr-2 text-white ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
