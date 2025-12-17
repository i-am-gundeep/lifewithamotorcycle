import { useState } from "react";
import html2canvas from "html2canvas";
import {
  Box, Grid, Input, Text, VStack, Image,
  Select, Heading, Button
} from "@chakra-ui/react";

export default function MotoRecap() {
  const [data, setData] = useState({
    handle: "lifewithamotorcycle",
    km: "7.7K",
    trips: "4",
    speed: "170",
    accidents: "0",
    money: "4.5L",
    longest: "900",
    challans: "1",
    altitude: "14.5K",
    personality: "WEEKEND WARRIOR",
    since: "2016"
  });

  const [image, setImage] = useState(null);

  const update = e =>
    setData({ ...data, [e.target.name]: e.target.value });

  const upload = e => {
    const r = new FileReader();
    r.onload = () => setImage(r.result);
    r.readAsDataURL(e.target.files[0]);
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
    <Box minH="100vh" bg="#0B0F0C" color="#EDEDED" p={6}>
      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={8}>

        {/* INPUTS */}
        <VStack align="stretch" spacing={3}>
          <Heading color="#6CFF9B">MY RIDING RECAP 2025</Heading>

          <Input type="file" onChange={upload} />
          <Input name="handle" value={data.handle} onChange={update} placeholder="IG handle" />
          <Input name="km" value={data.km} onChange={update} placeholder="Total KM" />
          <Input name="trips" value={data.trips} onChange={update} placeholder="Trips" />
          <Input name="speed" value={data.speed} onChange={update} placeholder="Top speed" />
          <Input name="accidents" value={data.accidents} onChange={update} placeholder="Accidents" />
          <Input name="money" value={data.money} onChange={update} placeholder="Money spent" />
          <Input name="longest" value={data.longest} onChange={update} placeholder="Longest ride" />
          <Input name="challans" value={data.challans} onChange={update} placeholder="Challans" />
          <Input name="altitude" value={data.altitude} onChange={update} placeholder="Altitude" />

          <Select name="personality" value={data.personality} onChange={update}>
            <option>WEEKEND WARRIOR</option>
            <option>MOUNTAIN HUNTER</option>
            <option>TOURING ADDICT</option>
            <option>NIGHT RIDER</option>
          </Select>

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
            bg="#0B0F0C"
            p={4}
            position="relative"
            overflow="hidden"
          >
            {/* Texture */}
            <Box
              position="absolute"
              inset={0}
              bgImage="radial-gradient(#ffffff15 1px, transparent 1px)"
              bgSize="6px 6px"
            />

            <Text color="#6CFF9B" fontSize="3xl" fontWeight="900">
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
                "MONEY": data.money,
                "LONGEST": data.longest,
                "CHALLANS": data.challans,
                "ALTITUDE": data.altitude
              }).map(([k, v]) => (
                <Box key={k}>
                  <Text fontSize="10px" opacity={0.6}>{k}</Text>
                  <Text fontSize="2xl" fontWeight="900" color="#6CFF9B">{v}</Text>
                </Box>
              ))}
            </Grid>

            {/* Polaroid */}
            <Box
              position="absolute"
              bottom="80px"
              left="16px"
              bg="#FAFAFA"
              p={2}
              w="170px"
              transform="rotate(-0.2deg)"
              boxShadow="0 15px 40px rgba(0,0,0,.45)"
            >
              {image && <Image src={image} h="120px" w="100%" objectFit="cover" />}
              <Text fontSize="xs" fontWeight="bold" color="#111">
                @{data.handle}
              </Text>
            </Box>

            <Text position="absolute" bottom="16px" right="16px" color="#6CFF9B">
              {data.personality}
            </Text>
          </Box>
        </Box>

      </Grid>
    </Box>
  );
}
