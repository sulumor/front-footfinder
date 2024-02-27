import crud from '@/utils/crud';
import { Button } from '@chakra-ui/react'

const DeleteMatchButton = ({matchId} : {matchId: string}) => {

    const id : string | null = localStorage.getItem("id");

    const handleClick = async () => {
        const response = await crud.delete(['player', 'match'], [Number.parseInt(id!, 10), Number.parseInt(matchId!, 10)]);
    return (response.data);
    };

    return (
        <Button colorScheme='red' size='sm' onClick={handleClick}>Supprimer</Button>
    )
};

export default DeleteMatchButton;