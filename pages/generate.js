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
  SimpleGrid,
  Image,
  Flex
} from "@chakra-ui/react";
import { useRouter } from "next/router";

const YEAR = new Date().getFullYear();

export default function Generate() {
  const [stats, setStats] = useState({});
  const [image, setImage] = useState(null);
  const router = useRouter();

  const handleChange = (e) =>
    setStats({ ...stats, [e.target.name]: e.target.value });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const generate = () => {
    const id = Math.random().toString(36).substring(2, 8);
    sessionStorage.setItem(
      id,
      JSON.stringify({ ...stats, image })
    );
    router.push(`/recap/${id}`);
  };

  return (
    <Box minH="100vh" bg="#0A0A0A" color="white" p={6}>
      <Heading textAlign="center" mb={8}>
        Moto Recap {YEAR}
      </Heading>

      <Flex
        direction={{ base: "column", md: "row" }}
        gap={8}
        maxW="1200px"
        mx="auto"
      >

        {/* LEFT: INPUTS */}
        <VStack spacing={4} flex="1">
          {[
            ["Your Instagram Handle", "handle"],
            ["Bike Name", "bike"],
            ["Total Kilometers", "km"],
            ["Trips", "trips"],
            ["Top Speed (km/h)", "speed"],
            ["Longest 1-Day Ride (km)", "longest"],
            ["Money Spent (₹)", "money"]
          ].map(([label, name]) => (
            <FormControl key={name}>
              <FormLabel fontSize="sm" color="gray.400">
                {label}
              </FormLabel>
              <Input
                name={name}
                bg="#151515"
                border="1px solid #222"
                onChange={handleChange}
              />
            </FormControl>
          ))}

          <FormControl>
            <FormLabel fontSize="sm" color="gray.400">
              Upload Your Favourite Trip Photo
            </FormLabel>
            <Input type="file" accept="image/*" onChange={handleImageUpload} />
          </FormControl>

          <Button
            colorScheme="orange"
            size="lg"
            w="100%"
            onClick={generate}
          >
            Generate Final Poster
          </Button>
        </VStack>

        {/* RIGHT: LIVE PREVIEW */}
        <Box flex="1" display="flex" justifyContent="center">
          <PosterPreview stats={stats} image={image} />
        </Box>

      </Flex>
    </Box>
  );
}

function PosterPreview({ stats, image }) {
  return (
    <Box
      w="320px"
      h="560px"
      bg="#000"
      borderRadius="2xl"
      overflow="hidden"
      position="relative"
      border="1px solid #222"
    >
      {image && (
        <Image
          src={image}
          alt="Trip"
          objectFit="cover"
          w="100%"
          h="100%"
          opacity={0.85}
        />
      )}

      <Box
        position="absolute"
        inset="0"
        bg="linear-gradient(180deg, transparent, #000)"
      />

      <Box position="absolute" bottom="6" w="100%" textAlign="center">
        <Text fontSize="xs" color="orange.400">
          {YEAR} RIDING RECAP
        </Text>
        <Heading size="sm">
          {stats.handle && `@${stats.handle}`}
        </Heading>
        <Text fontSize="xs" color="gray.400">
          Made with ❤️
        </Text>
      </Box>
    </Box>
  );
}
