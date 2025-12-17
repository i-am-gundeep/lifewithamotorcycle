import { useState } from "react";
import html2canvas from "html2canvas";
import {
  Box, Grid, Input, Text, VStack, Image,
  Select, Heading, Button, FormControl, FormLabel
} from "@chakra-ui/react";

export default function MotoRecap() {
  const [data, setData] = useState({
    handle: "",
    km: "",
    trips: "",
    speed: "",
    accidents: "",
    money: "",
    longest: "",
    challans: "",
    altitude: "",
    personality: "WEEKEND WARRIOR"
  });

  const [image, setImage] = useState(null);

  const update = e =>
    setData({ ...data, [e.target.name]: e.target.value });

  const upload = e => {
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result);
    reader.readAsDataURL(e.target.files[0]);
  };

  const download = async () => {
    const canvas = await html2canvas(
      document.getElementById("poster"),
      { scale: 3, backgroundColor: "#0B0F0C" }
    );
    const a = document.createElement("a");
    a.download = "moto_recap_2025.png";
    a.href = canvas.toDataURL();
    a.click();
  };

  return (
    <Box minH="100vh" bg="#0B0F0C" p={6}>
      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={8}>

        {/* INPUTS */}
        <VStack align="stretch" spacing={4}>
          <Heading className="neon">MY RIDING RECAP 2025</Heading>

          <FormControl>
            <FormLabel>📸 Upload your favourite ride memory</FormLabel>
            <Input type="file" onChange={upload} />
          </FormControl>

          <FormControl>
            <FormLabel>Instagram handle (without @)</FormLabel>
            <Input name="handle" onChange={update} placeholder="lifewithamotorcycle" />
          </FormControl>

          <FormControl>
            <FormLabel>Total kilometers ridden this year</FormLabel>
            <Input name="km" onChange={update} placeholder="7700 / 7.7K" />
          </FormControl>

          <FormControl>
            <FormLabel>Number of trips completed</FormLabel>
            <Input name="trips" onChange={update} placeholder="4" />
          </FormControl>

          <FormControl>
            <FormLabel>Top speed achieved (km/h)</FormLabel>
            <Input name="speed" onChange={update} placeholder="170" />
          </FormControl>

          <FormControl>
            <FormLabel>Total accidents (be honest 😄)</FormLabel>
            <Input name="accidents" onChange={update} placeholder="0" />
          </FormControl>

          <FormControl>
            <FormLabel>Total money spent on bike & gear</FormLabel>
            <Input name="money" onChange={update} placeholder="4.5L" />
          </FormControl>

          <FormControl>
            <FormLabel>Longest ride in one day (km)</FormLabel>
            <Input name="longest" onChange={update} placeholder="900" />
          </FormControl>

          <FormControl>
            <FormLabel>Police meetups / Challans</FormLabel>
            <Input name="challans" onChange={update} placeholder="1" />
          </FormControl>

          <FormControl>
            <FormLabel>Highest altitude reached (ft)</FormLabel>
            <Input name="altitude" onChange={update} placeholder="14500" />
          </FormControl>

          <FormControl>
            <FormLabel>Your riding personality</FormLabel>
            <Select name="personality" onChange={update}>
              <option>WEEKEND WARRIOR</option>
              <option>MOUNTAIN HUNTER</option>
              <option>TOURING ADDICT</option>
              <option>NIGHT RIDER</option>
            </Select>
          </FormControl>

          <Button colorScheme="green" onClick={download}>
            Download Poster
          </Button>
        </VStack>

        {/* POSTER */}
        <Box display="flex" justifyContent="center">
          <Box
            id="poster"
            w="360px"
            h="640px"
            position="relative"
            bg="#0B0F0C"
            p={4}
            overflow="hidden"
          >
            <Box className="recap-texture" />

            <Text fontFamily="Anton" fontSize="40px" className="neon">
              MOTO RECAP
            </Text>
            <Text fontSize="sm" opacity={0.7}>
              Year on Two Wheels · 2025
            </Text>

            <Grid templateColumns="1fr 1fr" gap={3} mt={4}>
              {Object.entries({
                "TOTAL KM": data.km,
                "TRIPS": data.trips,
                "TOP SPEED": data.speed,
                "ACCIDENTS": data.accidents,
                "MONEY SPENT": data.money,
                "LONGEST RIDE": data.longest,
                "CHALLANS": data.challans,
                "ALTITUDE": data.altitude
              }).map(([k, v]) => (
                <Box key={k}>
                  <Text fontSize="10px" opacity={0.6}>{k}</Text>
                  <Text fontSize="2xl" fontWeight="900" className="neon">{v || "--"}</Text>
                </Box>
              ))}
            </Grid>

            {/* POLAROID + PIN */}
            <Box position="absolute" bottom="70px" left="16px">
              <Image src="/pin.png" w="26px" position="absolute" top="-14px" left="50%" transform="translateX(-50%)" />
              <Box className="polaroid" w="170px">
                {image && <Image src={image} h="120px" w="100%" objectFit="cover" />}
                <Text fontSize="xs" fontWeight="bold" color="#111">
                  @{data.handle || "yourhandle"}
                </Text>
              </Box>
            </Box>

            <Text position="absolute" bottom="16px" right="16px" className="neon">
              {data.personality}
            </Text>
          </Box>
        </Box>

      </Grid>
    </Box>
  );
}
