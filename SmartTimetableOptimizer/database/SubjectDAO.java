import java.sql.Connection;
import java.sql.PreparedStatement;

public class SubjectDAO {

    public static void addSubject(
            String name,
            String teacher,
            int periodsPerWeek,
            String groupName,
            String roomType) {

        String sql =
                "INSERT INTO subjects " +
                "(name, teacher, periods_per_week, group_name, room_type) " +
                "VALUES (?, ?, ?, ?, ?)";

        try {

            Connection con = DBConnection.getConnection();

            PreparedStatement ps =
                    con.prepareStatement(sql);

            ps.setString(1, name);
            ps.setString(2, teacher);
            ps.setInt(3, periodsPerWeek);
            ps.setString(4, groupName);
            ps.setString(5, roomType);

            int rows = ps.executeUpdate();

            if (rows > 0) {
                System.out.println(
                        "Subject added: " + name
                );
            }

            ps.close();
            con.close();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}