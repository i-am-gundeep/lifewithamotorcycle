import { useState } from "react";
import html2canvas from "html2canvas";
import {
  Box, Grid, Text, Input, Select, Image, Button, VStack
} from "@chakra-ui/react";

export default function MotoRecap() {
  const [data, setData] = useState({});
  const [photo, setPhoto] = useState(null);

  const update = e =>
    setData({ ...data, [e.target.name]: e.target.value });

  const upload = e => {
    const r = new FileReader();
    r.onload = () => setPhoto(r.result);
    r.readAsDataURL(e.target.files[0]);
  };

  const download = async () => {
    const canvas = await html2canvas(
      document.getElementById("poster"),
      { scale: 3, backgroundColor: "#050505" }
    );
    const a = document.createElement("a");
    a.download = "moto_recap_2025.png";
    a.href = canvas.toDataURL();
    a.click();
  };

  return (
    <Box minH="100vh" p={6}>
      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={8}>

        {/* INPUTS */}
        <VStack align="stretch">
          <Input placeholder="Total KM ridden" name="km" onChange={update} />
          <Input placeholder="Trips completed" name="trips" onChange={update} />
          <Input placeholder="Top speed" name="speed" onChange={update} />
          <Input placeholder="Accidents?" name="accidents" onChange={update} />
          <Input placeholder="Money spent ₹" name="money" onChange={update} />
          <Input placeholder="Longest ride (km)" name="longest" onChange={update} />
          <Input placeholder="Police challans" name="challans" onChange={update} />
          <Input placeholder="Highest altitude" name="altitude" onChange={update} />
          <Input placeholder="Riding since" name="since" onChange={update} />
          <Input placeholder="Bike model" name="bike" onChange={update} />

          <Select name="brand" onChange={update}>
            <option>yamaha</option>
            <option>ktm</option>
            <option>triumph</option>
            <option>royal-enfield</option>
            <option>honda</option>
          </Select>

          <Select name="personality" onChange={update}>
            <option>Weekend Warrior</option>
            <option>Tourer</option>
            <option>Mileage King</option>
            <option>Speed Junkie</option>
            <option>Mountain Goat</option>
          </Select>

          <Input type="file" onChange={upload} />
          <Button colorScheme="green" onClick={download}>
            Download Story
          </Button>
        </VStack>

        {/* POSTER */}
        <Box
          id="poster"
          w="360px"
          h="640px"
          bgImage="url('/bg.jpg')"
          bgSize="cover"
          p={4}
          position="relative"
        >
          <Text className="neon" textAlign="center" fontSize="32px">
            MOTO RECAP
          </Text>

          <Grid templateColumns="1fr 1fr" gap={3} mt={4}>
            {Object.entries(data).slice(0, 8).map(([k, v]) => (
              <Box key={k}>
                <Text fontSize="12px">{k.toUpperCase()}</Text>
                <Text className="handwritten">{v}</Text>
              </Box>
            ))}
          </Grid>

          {photo && (
            <Box className="polaroid" position="absolute" bottom="70px" left="16px">
              <Image src={photo} w="140px" h="100px" objectFit="cover" />
            </Box>
          )}

          <Box position="absolute" bottom="16px" w="100%">
            <Grid templateColumns="repeat(4,1fr)" textAlign="center">
              <Text>Since {data.since}</Text>
              <Text>🏁</Text>
              {data.brand && (
                <Image src={`/brands/${data.brand}.png`} h="20px" mx="auto" />
              )}
              <Text>❤️</Text>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Box>
  );
}
