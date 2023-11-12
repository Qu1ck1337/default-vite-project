import React, { useState } from 'react'
import {
    chakra,
    Button,
    List,
    ListItem,
    Heading,
    Flex,
    Input,
    Text,
} from '@chakra-ui/react'

export const Home = () => {
    const [todos, setTodos] = useState([])
    const [text, setText] = useState('')

    const createTodoHandler = (text) => {
        setTodos((prevState) => [...prevState, { id: Date.now(), text }])
        setText('')
        // a = [1,2,3] => b = [...[1,2,3], 4,5,6] = [1,2,3,4,5,6]
    }

    const removeTodoHandler = (id) => {
        setTodos((prevState) => prevState.filter((todo) => todo.id !== id))
    }

    //If arrow function has one argument, then you can don't write brackets around the argument, e.g. prevState => ...
    const [isSorted, setIsSorted] = useState(false);
    const sortByName = () => {
        if (isSorted){
            setIsSorted(false);
            setTodos((prevState) => [...prevState.sort((a, b) => { return a.id - b.id })]);
            return
        }
        setTodos((prevState) => [...prevState.sort((a, b) => {
            if (a.text > b.text) {
                return 1;
            }
            if (a.text < b.text) {
                return -1;
            }
            // a должно быть равным b
            return 0;
        })]);
        setIsSorted(true);
    }

    const [isSearhing, setIsSearching] = useState(false)
    const [searchedTodos, setSearchedTodos] = useState([])
    const searchByName = (value) => {
        if (value.length === 0){
            setIsSearching(false);
            return
        }
        setIsSearching(true);
        setSearchedTodos(todos.filter((todo) => todo.text.startsWith(value)))
    }

    const exportCSV = () => {
        const [txt, setTxt] = useState('')
        for (const todo in todos){
            setTxt(txt + todo + '\n');
        }
          const [a, setA] = useState(document.createElement("a"));
          let file = new Blob([txt], {type: 'application/json'});
          a.href = URL.createObjectURL(file);
          a.download = "example.txt";
          a.click();
    }

    const addItems = (todos_list) =>
    {
        return todos_list.map((todo) => (
                    <ListItem
                        key={todo.id}
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        borderBottom="1px solid gray"
                        py="8px"
                    >
                        <Text>{todo.text}</Text>
                        <Button
                            onClick={() => removeTodoHandler(todo.id)}
                            background="red.500"
                            color="white"
                            _hover={{
                                background: 'red.600',
                            }}
                        >
                            Delete
                        </Button>
                    </ListItem>
                ))
    }

    return (
        <Flex
            flexDirection="column"
            h="100vh"
            w="100vw"
            m="1rem"
            gap="1rem"
            alignItems="center"
        >
            <Heading textTransform="uppercase">Todo List</Heading>
            <List
                h="60vh"
                w="70vw"
                display="flex"
                flexDirection="column"
                overflowY="scroll"
                border="2px solid black"
                borderRadius="md"
                p="10px"
            >
                <Flex
                    // justifyContent="space-between"
                    // alignItems="center"
                    columnGap="8px"
                >
                    <Button
                        onClick={() => sortByName()}
                        display="flex"
                        background={ isSorted ? 'blue.100' : 'blue.500'}
                        color="white"
                    >
                    Sort by name
                    </Button>
                    <Input
                        display="flex"
                        placeholder="Search by name"
                        onChange={(e) => searchByName(e.target.value)}
                    >
                    </Input>
                    <Button
                        onClick={() => exportCSV()}
                    >
                        Export File
                    </Button>
                </Flex>
                {isSearhing ? addItems(searchedTodos) : addItems(todos)}
            </List>
            <chakra.form
                onSubmit={(e) => {
                    e.preventDefault() // Without refreshing the page after adding
                    createTodoHandler(text)
                }}
                display="flex"
                flexDirection="column"
                alignItems="center"
                gap="20px"
            >
                <Input
                    placeholder="Write a task..."
                    maxLength={80}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    w="300px"
                    h="32px"
                />
                <Button
                    isDisabled={!text.trim().length}
                    type="submit"
                    w="fit-content"
                    background="blue.500"
                    color="white"
                    _hover={{
                        background: 'blue.600',
                    }}
                >
                    Add task
                </Button>
            </chakra.form>
        </Flex>
    )
}
