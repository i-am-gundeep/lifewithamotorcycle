"use client";
import { useEffect, useState } from "react";
import { Box, VStack, Text, Button, Image } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import html2canvas from "html2canvas";

export default function Recap() {
  const { query } = useRouter();
  const YEAR = new Date().getFullYear();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (query.id) {
      const saved = sessionStorage.getItem(query.id);
      if (saved) setData(JSON.parse(saved));
    }
  }, [query.id]);

  const downloadPoster = async () => {
    const canvas = await html2canvas(document.getElementById("poster"), {
      scale: 3
    });
    const link = document.createElement("a");
    link.download = "my_riding_recap.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  if (!data) return null;

  return (
    <Box minH="100vh" bg="#141414" color="white" py={10}>
      <VStack spacing={6}>
        <Box
          id="poster"
          w="360px"
          h="640px"
          bg="#141414"
          borderRadius="2xl"
          border="1px solid #222"
          p={4}
          textAlign="center"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          {/* Header */}
          <Box>
            <Text fontSize="xs" color="orange.400" letterSpacing="widest">
              MY RIDING RECAP {YEAR}
            </Text>
          </Box>

          {/* Polaroid */}
          <Box
            bg="white"
            p={2}
            borderRadius="md"
            boxShadow="lg"
            mx="auto"
            w="85%"
          >
            {data.image && (
              <Image
                src={data.image}
                objectFit="cover"
                w="100%"
                h="200px"
              />
            )}
            <Text mt={2} fontSize="sm" color="gray.700" fontWeight="bold">
              {data.handle ? `@${data.handle}` : "@yourhandle"}
            </Text>
          </Box>

          {/* Stats */}
          <VStack spacing={1}>
            {data.km && <Stat label="🛣️ This year I rode" value={data.km + " km"} />}
            {data.trips && <Stat label="🧭 Completed rides" value={data.trips} />}
            {data.speed && <Stat label="💨 Fastest" value={data.speed + " km/h"} />}
            {data.longest && <Stat label="🏔️ Longest run in a day" value={data.longest + " km"} />}
            {data.challans && <Stat label="🚓 Police meetups / Challans" value={data.challans} />}
            {data.money && <Stat label="💸 Total I spent this year" value={`₹${data.money}`} />}
          </VStack>

          {/* Footer */}
          <Text fontSize="xs" color="gray.500">
            made with ❤️
          </Text>
        </Box>

        <Button colorScheme="orange" size="lg" onClick={downloadPoster}>
          Download Poster
        </Button>
      </VStack>
    </Box>
  );
}

function Stat({ label, value }) {
  return (
    <Box>
      <Text fontSize="10px" color="gray.400" letterSpacing="widest">
        {label}
      </Text>
      <Text fontSize="lg" fontWeight="bold">
        {value}
      </Text>
    </Box>
  );
}
