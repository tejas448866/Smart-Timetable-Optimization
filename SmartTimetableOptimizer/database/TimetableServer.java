import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpExchange;

import java.io.*;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;

public class TimetableServer {

    public static void main(String[] args) throws Exception {

        HttpServer server = HttpServer.create(
                new InetSocketAddress(8080), 0
        );

        server.createContext("/generate", TimetableServer::generate);

        server.start();

        System.out.println("Timetable server started!");
        System.out.println("Open: http://localhost:8080");
    }

    private static void generate(HttpExchange exchange) {

        try {

            // Allow frontend requests
            exchange.getResponseHeaders().add(
                    "Access-Control-Allow-Origin", "*"
            );

            // Generate latest input.txt from MySQL
            InputFileGenerator.generateInputFile();

            // Run C++ program
            ProcessBuilder pb = new ProcessBuilder(
                    "..\\backend\\main.exe"
            );

            pb.directory(new File("..\\backend"));
            pb.redirectErrorStream(true);

            Process process = pb.start();

            BufferedReader reader =
                    new BufferedReader(
                            new InputStreamReader(
                                    process.getInputStream()
                            )
                    );

            StringBuilder consoleOutput = new StringBuilder();

            String line;

            while ((line = reader.readLine()) != null) {
                consoleOutput.append(line).append("\n");
            }

            int exitCode = process.waitFor();

            // Read generated timetable
            Path outputPath =
                    Path.of("..", "backend", "output.txt");

            String timetable = "";

            if (Files.exists(outputPath)) {
                timetable = Files.readString(outputPath);
            }

            String response =
                    "{"
                    + "\"success\":" + (exitCode == 0) + ","
                    + "\"timetable\":\""
                    + escapeJson(timetable)
                    + "\""
                    + "}";

            byte[] bytes =
                    response.getBytes(StandardCharsets.UTF_8);

            exchange.getResponseHeaders().set(
                    "Content-Type",
                    "application/json"
            );

            exchange.sendResponseHeaders(
                    200,
                    bytes.length
            );

            OutputStream os = exchange.getResponseBody();

            os.write(bytes);
            os.close();

        } catch (Exception e) {

            e.printStackTrace();

            String response =
                    "{\"success\":false,\"error\":\""
                    + escapeJson(e.getMessage())
                    + "\"}";

            try {

                byte[] bytes =
                        response.getBytes(StandardCharsets.UTF_8);

                exchange.getResponseHeaders().set(
                        "Content-Type",
                        "application/json"
                );

                exchange.sendResponseHeaders(
                        500,
                        bytes.length
                );

                exchange.getResponseBody().write(bytes);
                exchange.getResponseBody().close();

            } catch (Exception ignored) {
            }
        }
    }

    private static String escapeJson(String text) {

        if (text == null) {
            return "";
        }

        return text
                .replace("\\", "\\\\")
                .replace("\"", "\\\"")
                .replace("\r", "\\r")
                .replace("\n", "\\n");
    }
}