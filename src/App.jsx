import { useState } from "react";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Avatar,
  Text,
  VStack,
  Center,
  Flex,
} from "@chakra-ui/react";

function App() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (response.status === 404) {
        setError(true);
        setUser(null);
        return;
      }
      const data = await response.json();
      setUser(data);
      setError(false);
    } catch (error) {
      console.error(error);
    }
  };
  const handleReset = () => {
    setUsername("");
    setUser(null);
    setError(false);
  };

  return (
    <VStack
      p={4}
      mx=" "
      // maxW={"xl"}
      justify={"space-around"}
      sx={{
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Heading as="h1" textAlign="center" mb={8}>
        GitHub User
      </Heading>
      <Center>
        <form onSubmit={handleSubmit}>
          <FormControl id="username" isRequired>
            <FormLabel>Enter a GitHub username and press Submit:</FormLabel>
            <Input
              sx={{
                borderRadius: "10px",
                padding: "10px",
                backgroundColor: "#fff",
                color: "#000",
                width: "90%",
                my: 12,

                "&:focus": {
                  outline: "none",
                  boxShadow: "none",
                  border: "none",
                  backgroundColor: "#fff",
                  color: "#000",
                },
              }}
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </FormControl>
          <Flex width={"100%"} justify={"space-around"} mt={12}>
            <Button
              border={"1px solid teal"}
              type="submit"
              mt={4}
              colorScheme="teal"
              disabled={!username}
            >
              Submit
            </Button>
            <Button type="button" mt={4} onClick={handleReset}>
              Reset
            </Button>
          </Flex>
        </form>
        {user && (
          <Box mt={8}>
            <Avatar size="xl" src={user.avatar_url} name={user.login} />
            <Heading as="h2" size="lg" mt={4}>
              {user.name}
            </Heading>
            <Text mt={4}>
              {user.bio || "This user has no bio."}
              {error && "User not found."}
            </Text>
          </Box>
        )}
      </Center>
    </VStack>
  );
}

export default App;
