public class TestCalendar {

    public static void main(String[] args) {

        AcademicCalendarDAO.addHoliday(
                "2026-12-25",
                "Christmas",
                "Public Holiday"
        );

        boolean result =
                AcademicCalendarDAO.isHoliday("2026-12-25");

        System.out.println("Is Holiday: " + result);

        String name =
                AcademicCalendarDAO.getHolidayName("2026-12-25");

        System.out.println("Holiday Name: " + name);
    }
}