import { useEffect, useState } from "react";
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
  const [user, setUser] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);



  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true)

    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (response.status === 404) {
        setErrorMsg("User not found. Try another user please.")
        setUser(null);
        setIsLoading(false)

        return;
      }

      const data = await response.json();

      setUser(data);
      setErrorMsg(null);
      setIsLoading(false)

    } catch (error) {
      console.error(error);
    }
  };

  const handleReset = () => {
    setUsername("");
    setUser(null);
    setErrorMsg(null);
    setIsLoading(false)
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
              isLoading={isLoading}
              loadingText='Submitting'
            >
              Submit
            </Button>
            <Button type="button" mt={4} onClick={handleReset}>
              Reset
            </Button>
          </Flex>
        </form>
        {user && (
          <Box mt={8} ml={32}>
            {user && user.avatar_url && <Avatar size="xl" src={user.avatar_url} name={user.login} />}
            <Heading className="heading" as="h2" size="lg" mt={4}>
              {user.name && user.name}
              {user && !user.name && "User does not have a name"}
            </Heading>
            <Text className="bio" mt={4}>
              {user.bio || "This user has no bio."}
            </Text>
          </Box>
        )}

        {errorMsg && <p className="errorMsg">{errorMsg && errorMsg}</p>}


      </Center>
    </VStack>
  );
}

export default App;
