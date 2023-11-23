import { useEffect } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import Modal from "@/Components/Modal";

export default function UserCreateModalForm({ show, onClose }) {
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

        post(route("user.store"), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    };

    return (
        <Modal show={show} onClose={onClose}>
            <div className="p-6">
                <form onSubmit={submit}>
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        Cadastro de usuário
                    </h2>

                    <p className="mt-2 mb-4 text-sm text-gray-600 dark:text-gray-400">
                        Após o registro, o usuário receberá um e-mail para
                        definir sua senha.
                    </p>

                    <div>
                        <InputLabel htmlFor="name" value="Nome" />

                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full"
                            autoComplete="name"
                            isFocused={true}
                            onChange={(e) => setData("name", e.target.value)}
                            required
                        />

                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="email" value="E-mail" />

                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            onChange={(e) => setData("email", e.target.value)}
                            required
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <PrimaryButton className="ml-4" disabled={processing}>
                            Registrar
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
