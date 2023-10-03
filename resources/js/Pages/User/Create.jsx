import { useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import Container from "@/Components/Container";
import Paper from "@/Components/Paper";
import SecondaryButton from "@/Components/SecondaryButton";

export default function Create({ auth }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
    });

    useEffect(() => {
        return () => {
            reset();
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("user.store"));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Cadastro de usuário
                </h2>
            }
        >
            <Head title="Registrar Usuário" />

            <div className="py-12">
                <Container>
                    <div className="flex items-center justify-end px-4 sm:px-0">
                        <Link href={route("user.list")}>
                            <SecondaryButton>Return</SecondaryButton>
                        </Link>
                    </div>
                    <Paper>
                        <form onSubmit={submit}>
                            <div>
                                <InputLabel htmlFor="name" value="Name" />

                                <TextInput
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full"
                                    autoComplete="name"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    required
                                />

                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mt-4">
                                <InputLabel htmlFor="email" value="Email" />

                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full"
                                    autoComplete="username"
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    required
                                />

                                <InputError
                                    message={errors.email}
                                    className="mt-2"
                                />
                            </div>

                            <div className="flex items-center justify-end mt-4">
                                <PrimaryButton
                                    className="ml-4"
                                    disabled={processing}
                                >
                                    Registrar
                                </PrimaryButton>
                            </div>
                        </form>
                    </Paper>
                </Container>
            </div>
        </AuthenticatedLayout>
    );
}
