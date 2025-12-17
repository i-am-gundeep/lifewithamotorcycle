import { useState } from "react";
import {
  Box,
  Input,
  VStack,
  Heading,
  Text,
  Button,
  FormControl,
  FormLabel,
  SimpleGrid
} from "@chakra-ui/react";
import html2canvas from "html2canvas";
import { useRouter } from "next/router";

const YEAR = new Date().getFullYear();

export default function Generate() {
  const [stats, setStats] = useState({});
  const router = useRouter();

  const handleChange = (e) =>
    setStats({ ...stats, [e.target.name]: e.target.value });

  const generateLink = () => {
    const id = Math.random().toString(36).substring(2, 8);
    sessionStorage.setItem(id, JSON.stringify(stats));
    router.push(`/recap/${id}`);
  };

  return (
    <Box minH="100vh" bg="#070707" color="white" py={10}>
      <VStack spacing={10} maxW="520px" mx="auto" px={4}>

        {/* Header */}
        <Box textAlign="center">
          <Heading fontSize="4xl" letterSpacing="widest">
            MOTO RECAP
          </Heading>
          <Text color="orange.400" letterSpacing="wide" fontWeight="bold">
            LIFE WITH A MOTORCYCLE · {YEAR}
          </Text>
        </Box>

        {/* Inputs */}
        <SimpleGrid columns={1} spacing={4} w="100%">
          {[
            ["Bike Name", "bike"],
            ["Total Kilometers", "km"],
            ["Trips", "trips"],
            ["Top Speed (km/h)", "speed"],
            ["Longest 1-Day Ride (km)", "longest"],
            ["Money Spent on Bike & Gear (₹)", "money"]
          ].map(([label, name]) => (
            <FormControl key={name}>
              <FormLabel fontSize="xs" color="gray.400">
                {label}
              </FormLabel>
              <Input
                name={name}
                onChange={handleChange}
                bg="#121212"
                border="1px solid #222"
                _focus={{ borderColor: "orange.400" }}
              />
            </FormControl>
          ))}
        </SimpleGrid>

        <Button
          colorScheme="orange"
          size="lg"
          w="100%"
          onClick={generateLink}
        >
          Generate Ultra Recap
        </Button>

      </VStack>
    </Box>
  );
}
