package com.uinetworks.chart;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class chartDao {
	@Autowired
	private SqlSessionTemplate sqlSession;
	
	public List<chartVo> getChartData(){
		return sqlSession.selectList("sql.sel");
	}
}
