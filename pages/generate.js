import { useState } from "react";
import {
  Box,
  Input,
  VStack,
  Heading,
  Text,
  Button,
  FormControl,
  FormLabel
} from "@chakra-ui/react";
import html2canvas from "html2canvas";

export default function Generate() {
  const [stats, setStats] = useState({});

  const handleChange = (e) =>
    setStats({ ...stats, [e.target.name]: e.target.value });

  const download = async () => {
    const canvas = await html2canvas(document.getElementById("recap"));
    const link = document.createElement("a");
    link.download = "lifewithamotorcycle-recap.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <VStack spacing={6} p={10}>
      <Heading>Motorcycle Recap</Heading>

      {[
        ["Total KM", "km"],
        ["Trips", "trips"],
        ["Top Speed (km/h)", "speed"],
        ["Longest Ride (km)", "longest"],
        ["Money Spent (₹)", "money"]
      ].map(([label, name]) => (
        <FormControl key={name}>
          <FormLabel>{label}</FormLabel>
          <Input name={name} onChange={handleChange} />
        </FormControl>
      ))}

      <Box
        id="recap"
        p={6}
        bg="black"
        color="white"
        borderRadius="lg"
        textAlign="center"
      >
        <Heading size="md">@lifewithamotorcycle</Heading>
        <Text>Total KM: {stats.km}</Text>
        <Text>Trips: {stats.trips}</Text>
        <Text>Top Speed: {stats.speed}</Text>
        <Text>Longest Ride: {stats.longest}</Text>
        <Text>Money Spent: ₹{stats.money}</Text>
      </Box>

      <Button colorScheme="orange" onClick={download}>
        Download Recap Image
      </Button>
    </VStack>
  );
}
