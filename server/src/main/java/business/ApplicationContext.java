package business;

import business.book.BookDao;
import business.book.BookDaoJdbc;
import business.category.CategoryDao;
import business.category.CategoryDaoJdbc;
import business.customer.CustomerDao;
import business.customer.CustomerDaoJdbc;
import business.order.DefaultOrderService;
import business.order.LineItemDao;
import business.order.LineItemDaoJdbc;
import business.order.OrderDao;
import business.order.OrderDaoJdbc;
import business.order.OrderService;

public class ApplicationContext {

    private CategoryDao categoryDao;
    private BookDao bookDao;
    private OrderService orderService;
    private CustomerDao customerDao; // Add CustomerDao field
    private OrderDao orderDao; // Add OrderDao field
    private LineItemDao lineItemDao; // Add LineItemDao field

    public static ApplicationContext INSTANCE = new ApplicationContext();

    private ApplicationContext() {
        // Initialize DAOs
        categoryDao = new CategoryDaoJdbc();
        bookDao = new BookDaoJdbc();
        customerDao = new CustomerDaoJdbc(); // Initialize CustomerDao
        orderDao = new OrderDaoJdbc(); // Initialize OrderDao
        lineItemDao = new LineItemDaoJdbc(); // Initialize LineItemDao

        // Initialize OrderService
        orderService = new DefaultOrderService();
        ((DefaultOrderService) orderService).setBookDao(bookDao);
        ((DefaultOrderService) orderService).setCustomerDao(customerDao); // Inject CustomerDao
        ((DefaultOrderService) orderService).setOrderDao(orderDao); // Inject OrderDao
        ((DefaultOrderService) orderService).setLineItemDao(lineItemDao); // Inject LineItemDao
    }

    public CategoryDao getCategoryDao() {
        return categoryDao;
    }

    public BookDao getBookDao() {
        return bookDao;
    }

    public OrderService getOrderService() {
        return orderService;
    }

    public CustomerDao getCustomerDao() {
        return customerDao;
    }

    public OrderDao getOrderDao() {
        return orderDao;
    }

    public LineItemDao getLineItemDao() {
        return lineItemDao;
    }
}
