import java.sql.Connection;
import java.sql.PreparedStatement;

public class RoomDAO {

    public static void addRoom(
            String name,
            String roomType,
            int capacity) {

        String sql =
                "INSERT INTO rooms(name, room_type, capacity) " +
                "VALUES (?, ?, ?)";

        try {

            Connection con = DBConnection.getConnection();

            PreparedStatement ps =
                    con.prepareStatement(sql);

            ps.setString(1, name);
            ps.setString(2, roomType);
            ps.setInt(3, capacity);

            int rows = ps.executeUpdate();

            if (rows > 0) {
                System.out.println(
                        "Room added: " + name
                );
            }

            ps.close();
            con.close();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}