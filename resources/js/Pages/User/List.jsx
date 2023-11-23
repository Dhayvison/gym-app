import Container from "@/Components/Container";
import Pagination from "@/Components/Pagination";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { useState } from "react";
import UserCreateModalForm from "./Partials/UserCreateModalForm";
import Modal from "@/Components/Modal";

export default function List({ auth, users }) {
    const { data, meta } = users;
    const [registeringUser, setRegisteringUser] = useState(false);
    const [search, setSearch] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();

        router.get(
            route(route().current()),
            { search },
            {
                replace: true,
                preserveState: true,
            }
        );
    };

    const showModalUserForm = () => {
        setRegisteringUser(true);
    };

    const closeModal = () => {
        setRegisteringUser(false);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Usuários
                </h2>
            }
        >
            <Head title="Usuários" />

            <div className="py-12">
                <Container>
                    <div className="flex items-center justify-between px-4 sm:px-0">
                        <form onSubmit={handleSearch}>
                            <div className="flex items-center gap-2">
                                <TextInput
                                    type="search"
                                    placeholder="Nome ou e-mail..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                ></TextInput>
                                <SecondaryButton type="submit">
                                    Buscar
                                </SecondaryButton>
                            </div>
                        </form>

                        <Pagination
                            meta={meta}
                            route={route().current()}
                        ></Pagination>

                        <PrimaryButton onClick={showModalUserForm}>
                            Cadastrar Usuário
                        </PrimaryButton>
                    </div>
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg mt-4">
                        <div className="w-full p-4">
                            <p className="text-center opacity-50">
                                <strong>
                                    <small>
                                        Listando {data.length} de {meta.total}{" "}
                                        itens no total
                                    </small>
                                </strong>
                            </p>
                            <table className="w-full">
                                <thead>
                                    <tr>
                                        <th className="px-2 py-3 text-left text-xs uppercase tracking-wider">
                                            Nome
                                        </th>
                                        <th className="px-2 py-3 text-left text-xs uppercase tracking-wider">
                                            E-mail
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((user) => {
                                        return (
                                            <tr key={user.id}>
                                                <td className="px-2 py-4 whitespace-no-wrap border-b ">
                                                    {user.name}
                                                </td>
                                                <td
                                                    className="px-2 py-4 whitespace-no-wrap border-b max-w-md truncate"
                                                    title={user.description}
                                                >
                                                    {user.email}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Container>
            </div>

            <UserCreateModalForm show={registeringUser} onClose={closeModal} />
        </AuthenticatedLayout>
    );
}
