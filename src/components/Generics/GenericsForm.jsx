import { useForm } from "react-hook-form";
import TextInput from "../ui/TextInput";
import Textarea from "../ui/Textarea";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Title from "../title/Title";
import Button from "../Button/Button";
import fetchWrapper from "../../util/fetchWrapper";

const schema = yup
  .object({
    name: yup.string().required().label("Name"),
    details: yup.string().required().label("Details"),
  })
  .required();
function GenericsForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const res = await fetchWrapper.post("/generics/Create", data);
      reset();
    } catch (error) {}
  };
  return (
    <div className="max-w-[900px] bg-blue-200">
      <Title>Generics Create</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mx-5">
          <TextInput
            label={"Name :"}
            register={register}
            placeholder="name"
            className="max-w-96 w-full"
            type={"text"}
            name="name"
            error={errors.name}
          />

          <Textarea
            label={"Details :"}
            register={register}
            placeholder="details"
            className="max-w-96 w-full"
            type={"text"}
            row={"9"}
            name="details"
            error={errors.details}
          />
        </div>
        <Button className={"justify-start"}>create Generics</Button>
      </form>
    </div>
  );
}

export default GenericsForm;
