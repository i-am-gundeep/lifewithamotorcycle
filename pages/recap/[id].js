import { useEffect, useState } from "react";
import {
  Box,
  VStack,
  Heading,
  Text,
  Button,
  Image
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import html2canvas from "html2canvas";

const YEAR = new Date().getFullYear();

export default function Recap() {
  const { query } = useRouter();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (query.id) {
      const saved = sessionStorage.getItem(query.id);
      if (saved) setData(JSON.parse(saved));
    }
  }, [query.id]);

  const download = async () => {
    const canvas = await html2canvas(
      document.getElementById("poster"),
      { scale: 3 }
    );
    const link = document.createElement("a");
    link.download = "moto-recap.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  if (!data) return null;

  return (
    <Box minH="100vh" bg="#000" color="white" py={10}>
      <VStack spacing={6}>
        <Box
          id="poster"
          w="360px"
          h="640px"
          position="relative"
          borderRadius="2xl"
          overflow="hidden"
          border="1px solid #222"
        >
          {data.image && (
            <Image
              src={data.image}
              objectFit="cover"
              w="100%"
              h="100%"
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
              @{data.handle}
            </Heading>
            <Text fontSize="xs" color="gray.400">
              Made with ❤️
            </Text>
          </Box>
        </Box>

        <Button colorScheme="orange" size="lg" onClick={download}>
          Download Poster
        </Button>
      </VStack>
    </Box>
  );
}
