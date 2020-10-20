package com.uinetworks.map;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.uinetworks.chart.chartVo;

@Repository
public class mapDao {
	@Autowired
	private SqlSessionTemplate sqlSession;
	
	public List<chartVo> getclickMapSearchPoint(chartVo vo){
		return sqlSession.selectList("sql.clickMapSearchPoint", vo);
	}
}
