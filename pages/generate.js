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
  Flex,
  Select
} from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function Generate() {
  const YEAR = new Date().getFullYear();
  const router = useRouter();

  const [stats, setStats] = useState({});
  const [image, setImage] = useState(null);

  const handleChange = (e) =>
    setStats({ ...stats, [e.target.name]: e.target.value });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const generatePoster = () => {
    const id = Math.random().toString(36).substring(2, 8);
    sessionStorage.setItem(
      id,
      JSON.stringify({ ...stats, image })
    );
    router.push(`/recap/${id}`);
  };

  return (
    <Box minH="100vh" bg="#141414" color="white" p={6}>
      <Heading textAlign="center" mb={6} fontSize={{ base: "2xl", md: "3xl" }}>
        my riding recap {YEAR}
      </Heading>

      <Flex
        direction={{ base: "column", md: "row" }}
        gap={8}
        maxW="1200px"
        mx="auto"
      >
        {/* Inputs */}
        <VStack spacing={4} flex="1">
          {/* Bike Brand Dropdown */}
          <FormControl>
            <FormLabel fontSize="sm" color="gray.400">
              choose your bike brand 🏍️
            </FormLabel>
            <Select
              placeholder="Select brand"
              name="brand"
              bg="#1A1A1A"
              border="1px solid #222"
              onChange={handleChange}
            >
              {[
                "Honda",
                "Yamaha",
                "Royal Enfield",
                "KTM",
                "Triumph",
                "BMW",
                "Kawasaki",
                "Suzuki",
                "TVS",
                "Bajaj",
                "Hero",
                "Other"
              ].map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </Select>
          </FormControl>

          {/* Ride Name */}
          <FormControl>
            <FormLabel fontSize="sm" color="gray.400">
              your ride's name ✨
            </FormLabel>
            <Input
              name="ride"
              bg="#1A1A1A"
              border="1px solid #222"
              onChange={handleChange}
            />
          </FormControl>

          {/* Other Cute Fields */}
          {[
            ["how far we rode 🛣️", "km"],
            ["rides we took 🧭", "trips"],
            ["fastest moment 💨", "speed"],
            ["longest day 🏔️", "longest"],
            ["fuelled with ₹💸", "money"],
            ["this is me on IG 📸", "handle"]
          ].map(([label, name]) => (
            <FormControl key={name}>
              <FormLabel fontSize="sm" color="gray.400">
                {label}
              </FormLabel>
              <Input
                name={name}
                bg="#1A1A1A"
                border="1px solid #222"
                onChange={handleChange}
              />
            </FormControl>
          ))}

          {/* Photo Upload */}
          <FormControl>
            <FormLabel fontSize="sm" color="gray.400">
              favourite memory 📷
            </FormLabel>
            <Input type="file" accept="image/*" onChange={handleImageUpload} />
          </FormControl>

          <Button
            colorScheme="orange"
            size="lg"
            w="100%"
            onClick={generatePoster}
          >
            Generate Poster
          </Button>
        </VStack>

        {/* Live Preview */}
        <Box flex="1" display="flex" justifyContent="center">
          <PosterPreview stats={stats} image={image} YEAR={YEAR} />
        </Box>
      </Flex>
    </Box>
  );
}

function PosterPreview({ stats, image, YEAR }) {
  return (
    <Box
      w={{ base: "280px", md: "320px" }}
      h={{ base: "520px", md: "600px" }}
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
          my riding recap {YEAR}
        </Text>
        {(stats.brand || stats.ride) && (
          <Text fontSize="sm" color="gray.400">
            {stats.brand} {stats.ride}
          </Text>
        )}
      </Box>

      {/* Polaroid Photo */}
      {image && (
        <Box
          bg="white"
          p={2}
          borderRadius="md"
          boxShadow="lg"
          mx="auto"
          w="85%"
        >
          <Image
            src={image}
            alt="Trip"
            objectFit="cover"
            w="100%"
            h="160px"
          />
          {stats.handle && (
            <Text mt={2} fontSize="xs" color="gray.700" fontWeight="bold">
              @{stats.handle}
            </Text>
          )}
        </Box>
      )}

      {/* Stats */}
      <VStack spacing={1}>
        {stats.km && <Stat label="🛣️ rode" value={stats.km + " km"} />}
        {stats.trips && <Stat label="🧭 rides" value={stats.trips} />}
        {stats.speed && <Stat label="💨 fastest" value={stats.speed + " km/h"} />}
        {stats.longest && <Stat label="🏔️ longest day" value={stats.longest + " km"} />}
        {stats.money && <Stat label="💸 fuelled" value={`₹${stats.money}`} />}
      </VStack>

      {/* Footer */}
      <Text fontSize="xs" color="gray.500">
        made with ❤️
      </Text>
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
